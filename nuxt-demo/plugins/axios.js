export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.onResponse(response=>{
        // console.log(response)
        console.log(`Making response to `,response)
    })
    $axios.onError(err=>{
        console.log(err)
    })
    $axios.onRequestError(err=>{
        
    })
    $axios.onResponseError(err=>{
        
    })

    // $axios.onError(error => {
    //     console.log(error)
    //     const code = parseInt(error.response && error.response.status)
    //     if (code === 400) {
    //        redirect('/400')
    //     }
    // })
}