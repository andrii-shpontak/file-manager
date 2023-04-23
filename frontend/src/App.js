import { useEffect, useState } from 'react';

function App() {
  const [parent, setParent] = useState('');
  const [data, setData] = useState({
    path: '',
    files: [],
  });

  const clickHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/?path=' + event.target.attributes.href.value)
      .then((res) => res.json())
      .then((result) => {
        let linkArr = result.path.split('/');
        linkArr.pop();
        setParent(linkArr.join('/'));
        setData(result);
      });
  };

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then(
        (result) => {
          setParent('');
          setData(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  if (data.files === []) {
    return (
      <div className="App">
        <h1>There in no data!</h1>
      </div>
    );
  }

  return (
    <div>
      <ul
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '20px',
          maxWidth: '500px',
          fontSize: '24px',
          listStyle: 'none',
          border: '1px solid black',
          borderRadius: '5px',
        }}>
        <div style={{ margin: '10px', backgroundColor: 'yellow' }}>
          Current: {data.path === '' ? '/' : data.path}
        </div>
        {data.path !== '' ? (
          <div style={{ margin: '10px', backgroundColor: 'rgb(132,253,166)' }}>
            <a href={parent} onClick={clickHandler}>
              Level up
            </a>
          </div>
        ) : null}
        {data.files.map((item, i) => {
          if (item.dir) {
            return (
              <li
                style={{
                  backgroundColor: '#dfdfdf',
                  padding: '15px 0 15px 70px',
                  borderRadius: '5px',
                }}
                key={i}>
                <a href={data.path + '/' + item.name} onClick={clickHandler}>
                  <svg
                    style={{ paddingRight: '15px' }}
                    fill="#000000"
                    width="24px"
                    height="24px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>folder</title>
                    <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-16q0-2.496-1.76-4.256t-4.224-1.76h-6.368q-0.64-1.76-2.176-2.88t-3.456-1.12h-8q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h8q0.8 0 1.408 0.608t0.576 1.408v1.984h10.016q0.8 0 1.408 0.608t0.576 1.408v16q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408z"></path>
                  </svg>
                  {item.name}
                </a>
              </li>
            );
          } else {
            return (
              <li style={{ padding: '15px 0 15px 70px' }} key={i}>
                <svg
                  style={{ paddingRight: '15px' }}
                  fill="#000000"
                  width="24px"
                  height="24px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <title>file</title>
                  <path d="M4 30.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-22.016l-8-8h-13.984q-0.832 0-1.44 0.608t-0.576 1.408v28zM8 28v-24h10.016v6.016h5.984v17.984h-16z"></path>
                </svg>{' '}
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default App;
