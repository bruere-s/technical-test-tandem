import { useEffect, useState } from 'react';
import { UserFlow } from "../../shared/types";

function App() {
    const [data, setData] = useState<UserFlow[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/data')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <h1>Tandem</h1>
            <p>{!data && 'Loading...'}</p>
            <div>{
                data && data.map((d) => {
                return <p key={d.uuid}>{d.session_id}</p>
            })}
            </div>
        </div>
    );
}

export default App;