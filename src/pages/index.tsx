import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Button, Container, Text, Title } from '@mantine/core';
import classes from './index.module.css';
import { IconBrandGithub, IconArrowUpRight } from '@tabler/icons-react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Container className={classes.wrapper} size={1400}>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to{' '}
          <Text component="span" className={classes.highlight} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            {siteConfig.title}
          </Text>{' '}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            探索在浙大海宁国际校区的一切
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component='a'
            href='/docs'
            className={classes.control}
            size="lg"
            td="none"
            variant="light"
            rightSection={<IconArrowUpRight size={22} />}>
            Get Started
          </Button>
          <Button
            component='a'
            href='https://github.com/frank-xjh/iZJU-Wiki'
            className={classes.control}
            size="lg"
            td="none"
            color="black"
            rightSection={<IconBrandGithub size={22} />}>
            Contribute
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
