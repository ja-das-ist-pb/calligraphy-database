// when visiting, say hi to backend, and record it

const BASE_URL = ""

async function visit() {
    const response = await fetch(`${BASE_URL}/visit`, {
        method:"POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "visit" : true
        })
    })
}

visit()