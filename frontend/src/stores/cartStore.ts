import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  orderType: 'PICKUP' | 'DELIVERY';
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: 'PICKUP' | 'DELIVERY') => void;
  setCustomerInfo: (info: Partial<CartState['customerInfo']>) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      orderType: 'PICKUP',
      customerInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }

        // Recalculate total
        const newItems = get().items;
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ total: newTotal });

        toast.success(`${item.name} added to cart!`);
      },

      removeItem: (id) => {
        const { items } = get();
        const newItems = items.filter(item => item.id !== id);
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        set({
          items: newItems,
          total: newTotal,
        });

        toast.success('Item removed from cart');
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const { items } = get();
        const newItems = items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: newItems,
          total: newTotal,
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          customerInfo: {
            name: '',
            phone: '',
            email: '',
            address: '',
          },
        });
      },

      setOrderType: (type) => {
        set({ orderType: type });
      },

      setCustomerInfo: (info) => {
        set({
          customerInfo: { ...get().customerInfo, ...info },
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);