import { GetServerSidePropsContext } from "next";

const EntranceSlug = () => {
  return <div>[slug]</div>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.slug;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${ctx.resolvedUrl.split("/")[1]}/${id}`
  );

  const data = await resp.json();

  return {
    props: { interior: data },
  };
}

export default EntranceSlug;
