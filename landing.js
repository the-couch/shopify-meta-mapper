
module.exports = (
  `
    <div>
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
        }
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
          outline: none;
          padding: 1rem;
        }
        .s-s {
          width: 32%;
        }
        .logger {
          width: 100%;
          height: 140px;
          padding: 5px;
          background-color: #000;
        }
        .logger span {
          font-size: 0.7rem;
          color: white;
          display: block;
        }
        .logger span.error {
          color: red;
        }
        form label span {
          padding-bottom: 30px;
        }
        form button {
          border: 0;
          cursor: pointer;
          padding: 8px 12px;
          background-color: black;
          color: white;
        }
      </style>
      <div class='container'>
        <h2>
          Shopify Meta Field Mapper
        </h2>
        <div class='content'>
          Simple solution for porting existing shopify meta field content to other fields. You will need to create a private app inside of your shopify store in order to use this tool.
        </div>
        <div style='margin-top: 20px;'>
          <form id='shopifyForm'>
            <div style='margin-bottom: 40px; display: flex; justify-content: space-between; padding-bottom: 40px; border-bottom: 1px solid #ccc;'>
              <input required class='s-i s-s' name='store_name' placeholder='shopify-store-name' />
              <input required class='s-i s-s' name='store_apikey' placeholder='Shopify API key' />
              <input required class='s-i s-s' name='store_password' placeholder='Shopify Password' />
            </div>
            <div style='margin-bottom: 10px; display: flex; justify-content: space-between;'>
              <label for='current_namespace' style='width: 48%'>
                <span>Original global namespace field</span><br />
                <input required class=' s-i'  style='width: 100%;' name='current_namespace' placeholder='Original Global Namespace' />
              </label>
              <label for='current_key' class='ml05' style='width: 48%'>
                <span>Original key field</span><br />
                <input required class='s-i' style='width: 100%;' name='current_key' placeholder='Original Key Field' />
              </label>
            </div>
            <div style='margin-bottom: 10px; display: flex; justify-content: space-between; padding-top:10px; border-top: 1px solid #ccc;'>
              <label for='new_namespace' style='width: 48%'>
                <span>New global namespace field</span><br />
                <input required class=' s-i'  style='width: 100%;' name='new_namespace' placeholder='New Global Namespace' />
              </label>
              <label for='new_key' class='ml05' style='width: 48%'>
                <span>New key field</span><br />
                <input required class='s-i' style='width: 100%;' name='new_key' placeholder='New Key Field' />
              </label>
            </div>
            <div>
              <button type='submit'>Pew pew pew</button>
            </div>
          </form>
        </div>
        <div class='logger'>
          <div id='logger'></div>
          <span>this is the logger...</span>
        </div>
        <div class='content'>
          <p>Created by <a href="https://thecouch.nyc">The Couch</a></p>
        </div>
      </div>
      <script>
        function toJSONString( form ) {
          var obj = {};
          var elements = form.querySelectorAll( "input, select, textarea" );
          for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
              obj[ name ] = value;
            }
          }

          return JSON.stringify( obj );
        }

        var form = document.getElementById('shopifyForm')
        var logger = document.getElementById('logger')

        form.addEventListener('submit', (e) => {
          e.preventDefault()
          var jsonForm = toJSONString(form)
          fetch('/api/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: jsonForm
          }).then((response) => {
            console.log(response)
            return response.json()
          }).then((json) => {
            console.log(json)
            if (json.error) {
              var span = document.createElement('span')
              span.classList.add('error')
              span.innerHTML = json.reason
              let logP = logger.parentNode
              logP.insertBefore(span, logger)
            } else {
              console.log('tacos')
              json.updates.map((log) => {
                var span = document.createElement('span')
                if (log.error) {
                  span.classList.add('error')
                } else {
                  span.classList.add('success')
                }
                span.innerHTML = log.result + ' for product with id of ' + log.id
                let logP = logger.parentNode
                logP.insertBefore(span, logger)
                console.log('singles')
              })
              console.log('timing')
              var span = document.createElement('span')
              span.innerHTML = 'successfully updated ' + json.success + ' metafields'
              let logP = logger.parentNode
              logP.insertBefore(span, logger)
            }

          })
        })
      </script>
    </div>
  `
)
