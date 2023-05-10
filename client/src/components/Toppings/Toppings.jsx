import React, { useState, useEffect } from 'react';
import ToppingsSummary from './ToppingsSummary';
import AvailableToppings from './AvailableToppings';
import ToppingsCategory from './ToppingsCategory';
import Card from './../UI/Card';
import classes from './Toppings.module.css';

const Toppings = (props) => {
  const [backendData, setBackendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ca1');

  console.log('back: ', backendData);
  useEffect(() => {
    fetch('http://localhost:5000/api').then(
      response => {
        return response.json()
      }
    ).then(
      data => {
      setIsLoading(false);
      return setBackendData(data);
    })
  }, [])

  const onSelect = (id) => {
    setSelectedCategory(id);
  }

  const onSaveItem = itemState => {
    props.onSaveItem(itemState);
  }

  const onSaveCategories = itemState => {
    console.log('itemState.amount: ', itemState.amount);
    const newData = backendData.map(category => {
      const newToppings = category.DUMMY_TOPPINGS.map(topping => {
        if (topping.id === itemState.id) {
          return {...topping, amount: itemState.amount};
        }
        return topping;
      });
      return {...category, DUMMY_TOPPINGS: newToppings}
    }
    )
    setBackendData(newData)
  }  

  if (isLoading) {
    return <div>Loading...</div>
  } else {
      return (
        <div className={classes.toppings}>
          <ToppingsSummary />
          <Card>
            <div className={classes.container}>
              <div className={classes.ulContainer}>
                <ul className={classes.liContainer}>
                  <ToppingsCategory
                    backendData={backendData}
                    onSelect={onSelect}
                  />
                </ul>
              </div>
              <AvailableToppings
                selectedCategory={selectedCategory} 
                onSaveItem={onSaveItem}
                onSaveCategories={onSaveCategories}
                backendData={backendData}
              />
            </div>
          </Card>
        </div>
      );
  }
}

export default Toppings;