import Providers from "@providers";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Providers>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        
        </Header>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus quibusdam iusto necessitatibus ipsum
          aliquam, pariatur sed molestias rem magnam aperiam molestiae id ut nesciunt at quod sint amet! Quibusdam, ut.
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Providers>
  );
}

export default App;
