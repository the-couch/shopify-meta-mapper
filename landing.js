module.exports = (
  `
    <div>
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
      <style>
        body, html {
          font-family: 'Space Mono';
        }
        h2 {
          font-family: 'Space Mono', monospace;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .content {
          padding-top: 30px;
        }
        a {
          color: #000;
        }
        svg {
          width: 30px;
          height: 30px;
        }
        .nounderline {
          text-decoration: none;
        }
        .ml05 {
          margin-left: 0.5rem;
        }
        .s-i {
          font-family: 'Space Mono';
          width: 32%;
          outline: none;
          padding: 1rem;
        }
      </style>
      <div class='container'>
        <h2>
          Shopify Meta Field Mapper
        </h2>
        <div class='content'>
          Simple solution for porting existing shopify meta field content to other fields.
        </div>
        <div style='margin-top: 20px;'>
          <form>
            <div style='margin-bottom: 20px; display: flex; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid #ccc;'>
              <input class='s-i' name='store-name' placeholder='shopify-store-name' />
              <input class='s-i' name='store-apikey' placeholder='Shopify API key' />
              <input class='s-i' name='store-password' placeholder='Shopify Password' />
            </div>
            <div style='margin-bottom: 10px;'>
              <label for='current'>
                <span>Current Field</span>
                <input class='ml05 s-i' name='current' placeholder='Original Field' />
              </label>
            </div>
            <div>
              <label for='updated'>
                <span>New Field</span>
                <input class='ml05 s-i' name='updated' placeholder='New Field' />
              </label>
            </div>
          </form>
        </div>
        <div class='content'>
          <p>Created by <a href="https://thecouch.nyc">The Couch</a></p>
        </div>
      </div>
    </div>
  `
)
