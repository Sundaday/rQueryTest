import React from 'react'
import { Formik, Form } from 'formik'
import { Heading, Stack, useToast } from '@chakra-ui/react'
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui"
import { useMutation } from 'react-query'
import axios from 'axios'

const addNewPost = async ({ title, body }) => {
    try {
        const { data } = await axios.post('https://gorest.co.in/public/v1/users/17/posts', {
            title,
            body,
        },{
            headers:{
                Authorization:'Bearer a909e7da03334cc8da0c36c103d36e3fae0b618102294e5e00300d551d480eeb'
            }
        });
        return data;
    } catch (error) {
        throw Error(error.message);
    }
}

const AddNewPost = () => {
    const toast = useToast()
    const { isLoading, data, mutateAsync } = useMutation(
        'addNewPost',
        addNewPost,
        {
            onError: (error) => {
                toast({ status: 'error', title: error.message });
            },
        }
    )

    return (
        <div>
            <Formik
                initialValues={{ title: '', body: '' }}
                onSubmit={async (values) => {
                    await mutateAsync({ title: values.title, body: values.body })
                }}
            >
                <Form>
                    <Stack my='4'>
                        <Heading fontSize="3xl" textAlign='center' >Add New Post</Heading>
                        <InputControl name="title" label="Title" />
                        <TextareaControl name='body' label="Content" />
                        <SubmitButton >Submit</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </div>
    )
}
export default AddNewPost