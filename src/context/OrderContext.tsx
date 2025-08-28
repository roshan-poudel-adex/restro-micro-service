import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderState {
  items: OrderItem[];
  total: number;
  orderType: 'pickup' | 'delivery';
  customerInfo: {
    name: string;
    phone: string;
    address?: string;
  };
  isAuthenticated: boolean;
}

type OrderAction =
  | { type: 'ADD_ITEM'; payload: OrderItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_ORDER_TYPE'; payload: 'pickup' | 'delivery' }
  | { type: 'SET_CUSTOMER_INFO'; payload: Partial<OrderState['customerInfo']> }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'CLEAR_ORDER' };

const initialState: OrderState = {
  items: [],
  total: 0,
  orderType: 'pickup',
  customerInfo: {
    name: '',
    phone: '',
    address: '',
  },
  isAuthenticated: false,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
      
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
      
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
      
    case 'SET_ORDER_TYPE':
      return {
        ...state,
        orderType: action.payload,
      };
      
    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: { ...state.customerInfo, ...action.payload },
      };
      
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
      
    case 'CLEAR_ORDER':
      return initialState;
      
    default:
      return state;
  }
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
} | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};