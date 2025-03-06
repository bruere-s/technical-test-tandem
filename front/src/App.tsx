import { useEffect, useState } from 'react';
import { UserFlow } from "../../shared/types";
import UserFlowVisualization from "./components/UserFlow";

function App() {
    const [data, setData] = useState<UserFlow[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/data')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <UserFlowVisualization data={data} />
        </div>
    );
}

export default App;