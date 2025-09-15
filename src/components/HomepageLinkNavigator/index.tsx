import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  Paper,
  Group,
  TextInput,
  Button,
  Text,
  rem,
  SimpleGrid,
  Card,
  ActionIcon,
  Avatar,
  Box,
  Modal
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconX, IconPlus, IconTrash, IconLink } from '@tabler/icons-react';
import classes from './styles.module.css';

interface Link {
  name: string;
  url: string;
}

interface Category {
  name: string;
  links: Link[];
}

interface LinkToDelete {
  categoryIndex: number;
  linkIndex: number;
  name: string;
}

const defaultCategories: Category[] = [
    {
        name: '国际校区常用网址',
        links: [
          { name: '国际校区官网 & MyZJU', url: 'https://www.intl.zju.edu.cn/' },
          { name: 'ZJUI 学院', url: 'https://zjui.intl.zju.edu.cn/' },
          { name: '国际校区书院', url: 'https://rc.intl.zju.edu.cn/' },
          { name: '国际校区图书馆', url: 'https://lib.intl.zju.edu.cn/' },
          { name: 'Blackboard', url: 'https://learn.intl.zju.edu.cn/' },
          { name: 'PeopleSoft', url: 'https://scrsprd.zju.edu.cn/' },
          { name: 'iBooking', url: 'https://ibooking.intl.zju.edu.cn/' },
          { name: 'Printer', url: 'https://print.intl.zju.edu.cn/' },
          { name: 'Campus Operation and Service', url: 'https://coc.intl.zju.edu.cn/' },
          { name: 'Relate', url: 'https://relate.intl.zju.edu.cn/' },
        ],
    },
];

const Favicon = ({ url }: { url: string }) => {
  const fallbackPaths = ['/favicon.ico', '/favicon.png', '/apple-touch-icon.png'];

  const [pathIndex, setPathIndex] = useState(0);

  const handleError = () => {
    setPathIndex((currentIndex) => currentIndex + 1);
  };

  if (pathIndex >= fallbackPaths.length) {
    return <Avatar size={28} radius="sm"><IconLink size="1.2rem" /></Avatar>;
  }

  let faviconUrl = '';
  try {
    faviconUrl = new URL(fallbackPaths[pathIndex], url).href;
  } catch (error) {
    return <Avatar size={28} radius="sm"><IconLink size="1.2rem" /></Avatar>;
  }

  return (
    <Avatar 
      src={faviconUrl} 
      alt={`${url} favicon`} 
      size={28} 
      radius="sm"
      onError={handleError} 
    />
  );
};

export default function HomepageLinkNavigator(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('国际校区常用网址');
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [linkToDelete, setLinkToDelete] = useState<LinkToDelete | null>(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem('myLinkCategories');
      setCategories(storedCategories ? JSON.parse(storedCategories) : defaultCategories);
    } catch (error) {
      console.error("Failed to parse categories from localStorage", error);
      setCategories(defaultCategories);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      localStorage.setItem('myLinkCategories', JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories to localStorage", error);
    }
  }, [categories]);

  const handleAddLink = () => {
    if (!categoryName.trim() || !linkName.trim() || !linkUrl.trim()) {
      notifications.show({
        title: '信息不完整',
        message: '请确保所有字段都已填写后再添加。',
        color: 'red',
        autoClose: 5000,
        withBorder: true,
      });
      return;
    }
    let formattedUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = 'https://' + formattedUrl;
    }

    const newCategories = JSON.parse(JSON.stringify(categories));
    const existingCategory = newCategories.find((c: Category) => c.name.toLowerCase() === categoryName.trim().toLowerCase());

    if (existingCategory) {
      existingCategory.links.push({ name: linkName.trim(), url: formattedUrl });
    } else {
      newCategories.push({ name: categoryName.trim(), links: [{ name: linkName.trim(), url: formattedUrl }] });
    }
    newCategories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
    setCategories(newCategories);
    setLinkName('');
    setLinkUrl('');
  };

  const handleDeleteClick = (categoryIndex: number, linkIndex: number) => {
    const link = categories[categoryIndex].links[linkIndex];
    setLinkToDelete({ categoryIndex, linkIndex, name: link.name });
    openModal();
  };
  
  const confirmDelete = () => {
    if (!linkToDelete) return;

    const { categoryIndex, linkIndex } = linkToDelete;
    const newCategories = JSON.parse(JSON.stringify(categories));
    const category = newCategories[categoryIndex];
    category.links.splice(linkIndex, 1);

    if (category.links.length === 0) {
      newCategories.splice(categoryIndex, 1);
    }
    setCategories(newCategories);
    
    closeModal();
    setLinkToDelete(null);
  };

  return (
    <>
      <Modal opened={modalOpened} onClose={closeModal} title={<Title order={4}>确认删除</Title>} centered>
        <Text>您确定要删除链接 “{linkToDelete?.name}” 吗？此操作无法撤销。</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={closeModal}>取消</Button>
          <Button color="red" onClick={confirmDelete}>确认删除</Button>
        </Group>
      </Modal>

      <Container size="lg" className={classes.wrapper}>
        <Title order={2} className={classes.title} ta="center" mt="sm">
          快速链接导航
        </Title>
        <Text c="dimmed" ta="center" mt="md" mb={50}>
          一些常用链接的集合。您可以添加自己的链接，数据将保存在您的浏览器中。
        </Text>

        <Box mb="xl">
          {categories.length > 0 ? (
            categories.map((category, categoryIndex) => (
              <Box key={category.name} mb="xl">
                <Title order={3} className={classes.categoryTitle} mb="md">
                  {category.name}
                </Title>
                <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
                  {category.links.map((link, linkIndex) => (
                    <Card withBorder padding={0} radius="md" key={link.url + linkIndex}>
                      <Group justify="space-between" wrap="nowrap" className={classes.cardInner}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className={classes.cardLink}>
                            <Group gap="sm" wrap="nowrap">
                                <Favicon url={link.url} />
                                <Text fw={500} size="sm" truncate>
                                    {link.name}
                                </Text>
                            </Group>
                        </a>
                        
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          onClick={() => handleDeleteClick(categoryIndex, linkIndex)}
                          title="删除此链接"
                          className={classes.deleteButton}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>
            ))
          ) : (
            <Paper withBorder p="xl" radius="md" ta="center">
              <Text c="dimmed">暂无链接，快在下方添加一个吧！</Text>
            </Paper>
          )}
        </Box>

        <Paper withBorder shadow="md" p="md" radius="md" className={classes.formPaper}>
          <Title order={4} mb="md">添加新链接</Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
            <TextInput label="类别名称" placeholder="eg. 常用工具" value={categoryName} onChange={(e) => setCategoryName(e.currentTarget.value)} onFocus={(e) => e.currentTarget.select()} />
            <TextInput label="链接名称" placeholder="eg. Blackboard" value={linkName} onChange={(e) => setLinkName(e.currentTarget.value)} />
            <TextInput label="链接 URL" placeholder="eg. learn.zju.edu.cn" value={linkUrl} onChange={(e) => setLinkUrl(e.currentTarget.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddLink()} />
          </SimpleGrid>
          <Group justify="flex-end" mt="md">
            <Button onClick={handleAddLink} leftSection={<IconPlus size={18} />}>添加</Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
}