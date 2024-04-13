export type Stats = {
  users: number;
  topics: number;
  tweets: number;
};

interface Props {
  stats: Stats;
}

export const Stats = ({ stats }: Props) => {
  return (
    <p className="text-sm text-gray-600 text-balance">
      We have archived <u>{stats.tweets} tweets</u> from{" "}
      <u>{stats.users} users</u> into <u>{stats.topics} topics</u>.
    </p>
  );
};
