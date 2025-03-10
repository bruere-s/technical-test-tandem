# Technical test Tandem

## Run project

Run the back-end:

```sh
cd back
npm i
npm start
```

Run the front-end:

```sh
cd front
npm i
npm start
```

You can now access the app on [http://localhost:3000](http://localhost:3000)

## Documentation

I choose to stick to the time limit of 2 hours. So I had no time to implement a nice display system for a PM. In a production context, I would have use a display library like [Recharts](https://recharts.org/en-US/api/SankeyChart) or [React Google Charts](https://www.react-google-charts.com/examples/sankey) to display the data in a more meaningful way, probably with a Sankey charts, which seems for me the best approach for this case.

The data was parsed using documentation from Recharts, so the data is nearly ready to be displayed in a Sankey chart.

I haven't implemented the search for anomalies neither, see the dedicated section.

### Your overall approach to processing the data

I created a simple back-end that serves the data to the front-end. The front-end is responsible for displaying the data and allowing the user to view it.
I then parsed the data to display it in a table. The lack of time did not allow me to implement the search for anomalies.

### How you identified and summarized meaningful flows
I simply parsed the JSON data in this way: Identify each unique session and the path that the user took. And then, increment a count for each source page and target page detected.

### How you detected anomalies
For the search of anomalies, I would have implemented a search by comparing the time of each session and detect a potential bottleneck. And also detect fast and efficient flow, so we can implement it on the more slow ones.
An other anomaly could be the potentials back and forth between pages in a unique session, meaning the user can be lost and searching for a specific page.

### Your strategy for scaling and industrializing the solution.

In the context of this test, I choose to compute the data on the client side. For a more efficient way in a real world scenario, I would have implemented a back-end that would have computed the data and then send it to the front-end. This way, the front-end would only have to display the data and can receive only the meaningful data, with a pagination and sorting system.
Also, use of Map and Record structure would have been better in a case of a large dataset. For this test, arrays are sufficient.
