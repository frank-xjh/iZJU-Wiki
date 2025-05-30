import React, {type ReactNode} from 'react';
import type {Props} from '@theme/NotFound/Content';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './index.module.css';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>页面迷路了...</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        您当前访问的页面暂时无法找到，可能是因为您输入的网址不正确或该页面已被删除或移动。
      </Text>
      <Group justify="center">
        <Button size="md" component="a" href="/">返回首页</Button>
      </Group>
    </Container>
  );
}
