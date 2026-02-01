(() => {
    console.log('[ABConvert] Running customer label script')
    const firstVisitTime = window.localStorage.getItem('abconvert-first-visit-time')
    if (!firstVisitTime) {
        window.localStorage.setItem('abconvert-first-visit-time', new Date().valueOf())
    }
})()
