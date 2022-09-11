import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Container, Stack, Flex, Text, Heading, Grid, Spinner, useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const fetchPost = async (id) => {
    try {
        const { data } = await axios.get(`https://gorest.co.in/public/v1/users/${id}/posts`)
        return data;
    } catch (err) {
        throw Error("Unable to fetch post: " + err.message)
    }
}

const Post = () => {
    const { id } = useParams();
    const toast = useToast();

    const { data, isLoading } = useQuery(
        ['post', id],
        () => fetchPost(id),
        {
            onError: (error) => {
                toast({ status: 'error', title: error.message });
            },
        });

    console.log(data)
    return (
        <Container maxW="1300px" mt="4">
            {isLoading ? (
                <Grid placeItems='center' height="100vh">
                    <Spinner />
                </Grid>
            ) : (
                <>
                    <Stack
                        p="4"
                        boxShadow="md"
                        borderRadius="20"
                        border="1px solid #ccc"
                        key={data.data[0].id}
                        mb="4"
                    >
                        <Flex justify="space-between">
                            <Text>UserId : {data.data[0].user_id}</Text>
                            <Text>PostId : {data.data[0].id}</Text>
                        </Flex>
                        <Heading fontSize="2x1">{data.data[0].title}</Heading>
                        <Text>{data.data[0].body}</Text>
                    </Stack>

                </>
            )}
        </Container>
    )
}

export default Post