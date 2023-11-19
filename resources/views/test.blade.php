{{ $apitoken }}

<input type="text" value={{$apitoken}} id="apitoken">

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    const apitoken = document.getElementById('apitoken').value;
    axios.get('https://rapi.earthlink.iq/api/reseller/home/Dashboard', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${apitoken}`
        }

    }).then(function (response) {
        // handle success
        console.log(response);
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
</script>