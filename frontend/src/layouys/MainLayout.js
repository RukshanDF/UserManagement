import { Layout } from "antd";
import Routs from "../components/Routs";
const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#002140",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routs />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
