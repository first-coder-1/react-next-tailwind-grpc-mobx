import { GetServerSideProps, Redirect } from "next";

export const runtime = "experimental-edge";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: `/login`,
    } as Redirect,
    props: {},
  };
};
