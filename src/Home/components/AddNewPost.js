import React from 'react'
import { Formik, Form } from 'formik'
import { Heading, Stack, useToast } from '@chakra-ui/react'
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui"
import { useMutation, useQueryClient } from 'react-query'
import { addNewPost } from '../../Api/index'

const AddNewPost = () => {
    const toast = useToast()
    const cache = useQueryClient()
    const { isLoading, data, mutateAsync } = useMutation(
        'addNewPost',
        addNewPost,
        {
            onSuccess: () =>{
                cache.invalidateQueries('posts')
            },
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