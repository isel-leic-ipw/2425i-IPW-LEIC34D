import initM1 from './module1.mjs';
import initM2 from './module2.mjs';
import initM3 from './module3.mjs';

try {
    const module3 = initM3();
    const module2 = initM2();
    const module1 = initM1(module2, module3);
    
    module1.printAll();
} catch (err) {
    console.error(err);
}