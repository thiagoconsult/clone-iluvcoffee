import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entitie';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Coffee 1',
        brand: 'Brand 1',
        flavors: ['Vanilla', 'Chocolate']
    }]

    private countId = 1;

    genId () {
        this.countId ++;
        return this.countId;
    }

    findAll() {
        if(this.coffees.length === 0){
            throw new NotFoundException()
        }
        return this.coffees;
    }

    fineOne(id: string) {
        let coffee = this.coffees.find(item => item.id === +id);
        if(!coffee) {
            throw new NotFoundException()
        }
        return coffee;
    }

    create(createCoffeeDto: any){
        createCoffeeDto.id = this.genId()
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, body: any){
        
    }

    remove(id: string) {
        let coffee = this.coffees.findIndex(item => item.id === +id)
        if(coffee === -1) {
            throw new NotFoundException()
        }
        this.coffees.splice(coffee, 1)
        return { message: 'Coffee deleted.'}
    }

}
