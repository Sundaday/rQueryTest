import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Container, Stack, Flex, Text, Heading, Grid, Spinner, Button } from '@chakra-ui/react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AddNewPost from './components/AddNewPost'

const fetchPosts = async (id) => {
    try {
        const { data } = await axios.get("https://gorest.co.in/public/v1/posts?page=" + id)
        return data;
    } catch (err) {
        throw Error("Unable to fetch posts: " + err.message)
    }
}

const Home = () => {
    const { id } = useParams();
    const history = useNavigate()
    const pageId = parseInt(id);
    const { data, isLoading } = useQuery(
        ['posts', pageId],
        () => fetchPosts(pageId),
        {
            keepPreviousData: true,
        });

    //console.log(data)
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
                            isDisabled={data.meta.pagination.links.previous == null}
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