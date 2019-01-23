function render() {
  return (
    <>
      <img src="/static/logo.png" alt />
      <img src={require("/static/logo.png")} />

      <img data-src={require("/static/logo.png")} />
      <img data-src="/static/logo.png" />

      <link rel="stylesheet" href="/static/style.css" />
      <link rel="stylesheet" href={require("/static/style.css")} />

      <img src="//cdn.mydomain.com/logo.png" />
      <img src="http://cdn.mydomain.com/static/logo.png" />
      <img src="https://cdn.mydomain.com/static-logo.com" />
    </>
  )
}
