import ListCard from '~/components/ListCard';
import type { UserFragmentType } from '~/libs/fragments';

export default function UserCard({
  name,
  avatarUrl,
  login,
  bio,
  location,
}: UserFragmentType) {
  return (
    <ListCard
      type="User"
      image={
        <a href={avatarUrl} target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            width={20}
            height={20}
            className="rounded-full"
            src={avatarUrl}
            alt={`${name} avatar`.trim()}
          />
        </a>
      }
      title={name ?? login}
      subtitle={login}
      link={`/user/${login}`}
      body={bio}
      footer={location}
    />
  );
}
