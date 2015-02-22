A simple debug proxy that dumps URL and Content/Body to console.
Good to see traffic of REST API's.

Options: -h URL to original endpoint, -p Port to listen

The default output is colored, but it can be switched off using "-c false" - e.g. to redirect output into a log file

```
	node index.js -c false -h "http://localhost:9200" -p 9100 &  
    
    curl localhost:9100  should produce something like this on the proxy console

	2015-02-22T21:35:16.923Z REQ GET /
	2015-02-22T21:35:16.943Z RES 200
	{
	  "status" : 200,
	  "name" : "ISAAC",
	  "cluster_name" : "elasticsearch",
	  "version" : {
	    "number" : "1.4.3",
	    "build_hash" : "36a29a7144cfde87a960ba039091d40856fcb9af",
	    "build_timestamp" : "2015-02-11T14:23:15Z",
	    "build_snapshot" : false,
	    "lucene_version" : "4.10.3"
	  },
	  "tagline" : "You Know, for Search"
	}
```