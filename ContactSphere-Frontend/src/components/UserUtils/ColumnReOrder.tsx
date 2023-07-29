import { MdDragHandle } from 'react-icons/md'
import { createStyles, rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
   item: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      border: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
      padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
      paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
      marginBottom: theme.spacing.sm,
   },

   itemDragging: {
      boxShadow: theme.shadows.sm,
   },

   symbol: {
      fontSize: rem(30),
      fontWeight: 700,
      width: rem(60),
   },

   dragHandle: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
   },
}))

interface DndListHandleProps {
   data: {
      order: number;
      id: string;
      name: string;
   }[]
}

export default function ColumnReOrder({ data }: DndListHandleProps){
   const { classes, cx } = useStyles()
   const [state, handlers] = useListState(data)
 
   const items = state.map((item, index) => (
     <Draggable key={item.id} index={index} draggableId={item.id}>
       {(provided:any, snapshot:any) => (
         <div
           className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
           ref={provided.innerRef}
           {...provided.draggableProps}
           >
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
               <MdDragHandle size="1.05rem" stroke={1.5} />
            </div>
            <div>
               <Text>{item.name}</Text>
            </div>
         </div>
       )}
     </Draggable>
   ))

   return(
      // No Proper TS Support For paramters yet
      <DragDropContext
         onDragEnd={({ destination, source }:{destination:any, source:any}) =>
            handlers.reorder({ from: source.index, to: destination?.index || 0 })
         }
         >
           <Droppable droppableId="dnd-list" direction="vertical">
                  {(provided:any) => (
                     <div {...provided.droppableProps} ref={provided.innerRef}>
                     {items}
                     {provided.placeholder}
                     </div>
                  )}
            </Droppable> 
      </DragDropContext>    
   )
}