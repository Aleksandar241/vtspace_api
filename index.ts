import * as dotenv from 'dotenv';
import app from './src/server.js';

dotenv.config();
app.listen(process.env.PORT, () => {
    console.log('Server listening');
})