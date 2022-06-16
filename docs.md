## State Entities

state: {

  queue_stack: [ 
    [ { id: #####, callout: "", status: #, isUrgent: bool,  }, {...}, ... ],
    [...],
    ...
  ],

  config: {
    runline: #,
    columns: #
  }

}

## React Components

Car: an element which has a [**status**](#status) (empty, loading, or full), a callout_value
(usually an int, but can be a string), an urgency, and a position within a 
Queue.

Queue: an array of cars, plus a **Sendbox** element at the head, and an 
**Addbox** element at the rear

Sendbox: a large button to trigger car sending in its enclosing **Queue**

Addbox: a large button to add a car to the rear of its enclosing 
**Queue**

QueueStack: the array of queues (grid for **Outside**)

Callout: an element which displays the callout_value of its corresponding car, and
s styled depending on its status and urgency

CalloutQueue: an array of Callouts

CalloutQueueStack: an array of CalloutQueues (grid for Inside)

Outside: page displaying the NavBar, QueueStack, and modals

Inside: page displaying the NavBar and CalloutQueueStack

Admin: page displaying the NavBar and a form for editing configuration details

## System Events

Send: a car or cars may be **sent** using the **sendbox** element in its 
enclosing **Queue**. A car is eligible to be sent when the **sendbox** is 
clicked if all of the following conditions are met:
  1. The car has status Full
  2. The car is either at the head of the queue, ***OR*** there are no 
  ineligible cars ahead of it in the queue.

## Domain Terms

Car/callout: for the purposes of the domain, callout = car.

Runline: the line at which cars may be run on by runners. For example if the 
runline is 3, then the top 3 cars in a CalloutQueue may be run on.

Columns: for the purposes of the comain, columns = # of **Queues** in the 
**QueueStack**

Car status (empty, loading, full)<a id="status"></a>:
  - Empty - this car is waiting on one or more to be fetched by runners. Empty 
  cars are displayed with callouts on Inside.
  - Loading - all children in this car have been fetched by runners. The admin
  team can now mark this car as Loading, which will prevent its callout from 
  being displayed on Inside. Loading cars are still diplayed on Outside. 
  Children will be loaded into the car shortly.
  - Full - this car has all its children safely loaded in. It will remain 
  displayed on Outside, but will not have a callout displayed on Inside. A car 
  being Full is necssary but not sufficient to make it eligible to be **sent**
  when the **sendbox** is clicked.

