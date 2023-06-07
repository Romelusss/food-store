import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import Meal from './MealItem/Meal';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect (() => {
      const fetchMeals = async () => {
        const response = await fetch('https://react-course-1ab92-default-rtdb.firebaseio.com/meals.json');
        const data = await response.json();

        if(!response.ok) {
          throw new Error('Failed to fetch meals');
        };

        const loadedData = [];

        for(const key in data){
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedData);
        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });

    }, [])

    if(isLoading){
      return(
        <section className={classes.loading}>
          <p>Loading.....</p>
        </section>
      )
    }

    if(httpError){
      return (
        <section className={classes.error}>
          <p>{httpError}</p>
        </section>
      )
    }
    
    const mealsList = meals.map((meal) => (
      <Meal
        key = {meal.id}
        id = {meal.id}
        name = {meal.name} 
        description = {meal.description} 
        price = {meal.price}
      />
    ));

    return (
        <section className={classes.meals}>
          <Card>
            <ul>
                {mealsList}
            </ul>            
          </Card>
        </section>
    )
};

export default AvailableMeals;