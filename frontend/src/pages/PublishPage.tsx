
import { Button, TextField } from "@mui/material"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChangeEvent, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

import "./PublishPage.css"
const PublishPage = () => {
    const usenavigate = useNavigate()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    console.log(content)
    return (

        <div className="publishpage">
            <div className="publishpage-container">
                <CustomTextField onChange={(e) => { setTitle(e.target.value) }} />
                <CustomMultilineTextField onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <Button onClick={async ()=>{
                    const response=await axios.post(`${BACKEND_URL}/app/v1/blog`,
                        {
                            title,
                            content
                        },
                        {
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        }
                    )

                    usenavigate(`/blog/${response.data.id}`)
                }}

                variant="contained" color="success" sx={{ width: "90%", marginTop: "0px" }}>
                Submit
            </Button>
        </div>

        </div >
    )
}

export default PublishPage




const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'darkgreen',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'lightgreen',
                    },
                    '& input': {
                        color: 'white',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '&.Mui-focused': {
                        color: 'lightgreen',
                    },
                },
            },
        },
    },
});

const CustomTextField = ({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) => {
    return (
        <ThemeProvider theme={theme}>
            <TextField onChange={onChange}
                required
                id="outlined-basic"
                label="Title"
                variant="outlined"

                sx={{

                    width: "90%",
                    '& .MuiInputBase-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'green', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'darkgreen', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'lightgreen', // Focused border color
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'lightgreen', // Focused label color
                    },
                }}
            />
        </ThemeProvider>
    );
};









const theme2 = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'darkgreen',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'lightgreen',
                    },
                    '& input': {
                        color: 'white',
                    },
                    '& textarea': {
                        color: 'white',
                    },

                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '&.Mui-focused': {
                        color: 'lightgreen',

                    },
                },
            },
        },
    },
});

const CustomMultilineTextField = ({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) => {
    return (
        <ThemeProvider theme={theme2}>
            <TextField onChange={onChange}
                id="outlined-multiline-static"
                label="Content"
                multiline
                placeholder="Write here"
                rows={4}
                // defaultValue="Post here"
                sx={{
                    width: '90%',  // Custom width
                    minHeight: '100px', // Custom height
                    '& .MuiInputBase-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'green', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'darkgreen', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'lightgreen', // Focused border color
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'lightgreen', // Focused label color
                    },
                }}
            />
        </ThemeProvider>
    );
};



