
import express from 'express';

const app: express.Application = express();

const port: number = 3000;

app.use(express.json())



app.post('/', (req, res) => {
    try {
        const {productList} = req.body
    
        var op10Price: number = 849.99
        var op11Price: number = 949.99
        var budsPrice: number = 129.99
        var wtchPrice: number = 229.99
    
        var op10TotalPrice : number = 0
        var op11TotalPrice : number = 0
        var budsTotalPrice : number = 0
        var wtchTotalPrice : number = 0
    
    
        var array1: string[]; 
        array1 = productList
        // array1 = ["wtch", "op11", "op11", "op11", "buds", "buds", "op11", "op11"]
        // array1 = ["buds", "op10", "buds", "buds"]
    
    
        let map:any = {};
        for (let i = 0; i < array1.length; i++) {
            let item: string = array1[i];
            map[item] = (map[item] + 1) || 1;
    
            if (item == "op10") {
                op10TotalPrice = map["op10"] * op10Price
            }
    
            // OnePlus 11 offer price calculation
            if (item == "op11") {
                if (map["op11"] > 3) {
                    op11Price = 899.99
                }
                op11TotalPrice = map["op11"] * op11Price
            }
    
            // Buds offer price calculation
            if (item == "buds") {
                const budsOfferPrice:number = Math.floor(map["buds"] / 3) * 2 * budsPrice
                const budsWithoutOfferPrice:number = Math.floor(map["buds"] % 3) * budsPrice
                budsTotalPrice = budsOfferPrice + budsWithoutOfferPrice
            }
    
    
            if (item == "wtch") {
                wtchTotalPrice = map["wtch"] * wtchPrice
            }
        }
        const grandTotal = op10TotalPrice + op11TotalPrice + budsTotalPrice + wtchTotalPrice
    
        res.status(200).json({
            ...map,
            grandTotal
        });
        
    } catch (error) {
        res.status(500).json({
            "message": "Internal server error"
        })
    }
});

app.listen(port, () => {
    console.log(`TypeScript with Express, http://localhost:${port}/`);
});