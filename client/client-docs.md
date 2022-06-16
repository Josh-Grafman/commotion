## State Entities

## React Components

>- Car: an element which has a status (empty, loading, or full), a callout_value
(usually an int, but can be a string), an urgency, and a position within a 
Queue.
>
>- Queue: an array of cars, plus a sendbox element at the head, and an addbox 
element at the rear
>
>- QueueStack: the array of queues (grid)
>
>- Outside: page displaying the NavBar, QueueStack, and modals
>
>- Callout: an element which displays the callout_value of its corresponding car, and
is styled depending on its status and urgency
>
>- CalloutQueue: an array of Callouts
>
>- CalloutQueueStack: an array of CalloutQueues (grid for interior)
>
>- Inside: page displaying the NavBar and CalloutQueueStack
>
>- Admin: page displaying the NavBar and a form for editing configuration details

