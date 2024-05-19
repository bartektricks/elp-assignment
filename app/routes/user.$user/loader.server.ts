import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { getUser } from '~/libs/api/user.server';
import statusCodes from '~/utils/statusCodes.server';

const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const userParam = params.user;

  if (!userParam)
    return redirect('/', {
      status: 301,
    });

  const res = await getUser(userParam);
  const user = res.data?.user;

  if (!user) {
    throw json('Not found', {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
      statusText: 'User not found',
    });
  }

  return json({ ...user });
};

export default userLoader;
