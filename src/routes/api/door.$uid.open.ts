import { json } from '@tanstack/react-start';
import { createServerFileRoute } from '@tanstack/react-start/server';
import ky from 'ky';
import { turso } from '~/createDbClient';

export const ServerRoute = createServerFileRoute('/api/door/$uid/open')
  .methods({
    POST: async ({ params, request }) => {
      const [octConfig, doorConfig] = await Promise.all([
        turso.execute('select * from oct_config limit 1'),
        turso.execute(`select json_extract(door_info, '$') as door_info from door_config where uid = ?`, [params.uid])
      ]);
      const conf = octConfig.rows[0] as unknown as { openid: string; token: string };
      const doorInfoValue = doorConfig.rows?.[0]?.door_info as string;
      const door = JSON.parse(doorInfoValue);
      const body = await ky.post('https://octlife.octlife.cn/consumer/mall-applets-management/entrance/openDor', {
        headers: {
          ...conf
        },
        json: {
          ...door,
        }
      }).json();
      return json(body);
    }
  });
