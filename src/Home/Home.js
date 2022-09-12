import React from 'react'
import { useQuery } from 'react-query'
import { Container, Stack, Flex, Text, Heading, Grid, Spinner, Button, useToast } from '@chakra-ui/react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AddNewPost from './components/AddNewPost'
import { fetchPosts } from '../Api'

const Home = () => {
    const toast = useToast();
    const { id } = useParams();
    const history = useNavigate()
    const pageId = parseInt(id);
    const { data, isLoading } = useQuery(
        ['posts', 1445],
        () => fetchPosts(pageId),
        {
            keepPreviousData: true,
            onError: (error) => {
                toast({ status: "error", title: error.message });
              },
        });
    return (
        <Container maxW="1300px" mt="4">
            {isLoading ? (
                <Grid placeItems='center' height="100vh">
                    <Spinner />
                </Grid>
            ) : (
                <>
                <AddNewPost />
                <br />
                    <Flex justify="space-between" mb='4'>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                if (data.meta.pagination.links.previous !== null) {
                                    history(`/${pageId - 1}`);
                                }
                            }}
                            isDisabled={!data.meta.pagination.links.previous !== null}
                        >
                            Prev
                        </Button>
                        <Text>Current Page : {pageId}</Text>
                        <Button
                            colorScheme="green"
                            onClick={() => {
                                history(`/${pageId + 1}`);
                            }}
                        >
                            Next
                        </Button>
                    </Flex>
                    {data.data.map((post) => (
                        <Link key={post.id} to={`/post/${post.id}`}>
                            <Stack
                                p="4"
                                boxShadow="md"
                                borderRadius="20"
                                border="1px solid #ccc"
                                mb="4"
                            >
                                <Flex justify="space-between">
                                    <Text>UserId : {post.user_id}</Text>
                                    <Text>PostId : {post.id}</Text>
                                </Flex>
                                <Heading fontSize="2x1">{post.title}</Heading>
                                <Text>{post.body}</Text>
                            </Stack>
                        </Link>
                    ))}
                </>
            )}
        </Container>
    )
}

export default Home