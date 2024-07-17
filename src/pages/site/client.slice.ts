import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ICart } from '../../types/cart.type';
import { IParams } from '../../types/params.type';

interface ClientState {
  lessonId: string;
  isLessonDone: boolean;
  playingVideo: string;
  totalLectures: number;
  totalVideosLength: number;
  cart: ICart;
  totalCartPrice: number;
  searchQuery: string;
  params: IParams;
  lessonIdsDoneByCourseId: string[];
  currentProgress: number;
  certificatePath: string;
  isLessonChange: boolean;
  percentHavePlayed: number;
  selectedCoupon: string | null;
  currentLessonIndex: number;
  lessonIds: string[];
}

const storedCart = JSON.parse(localStorage.getItem('cart') || '{}') as ICart;

const localCart = {
  items: storedCart.items || []
};

const initialState: ClientState = {
  lessonId: '',
  playingVideo: 'https://www.youtube.com/watch?v=GQ-toR8F7rc&ab_channel=F8Official',
  isLessonDone: false,
  totalLectures: 0,
  totalVideosLength: 0,
  cart: localCart,
  totalCartPrice: 0,
  searchQuery: '',
  params: {},
  lessonIdsDoneByCourseId: [],
  currentProgress: 0,
  certificatePath: '',
  isLessonChange: false,
  percentHavePlayed: 0,
  selectedCoupon: null,
  currentLessonIndex: 0,
  lessonIds: []
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);

        if (courseExistingIdx === -1) {
          state.cart.items.push({ courseId: action.payload });

          const cartForStorage = {
            items: state.cart.items
          };

          localStorage.setItem('cart', JSON.stringify(cartForStorage));
          notification.success({
            message: 'Add to cart successfully!'
          });
        }
      } else {
        console.log('_id is null');
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
      localStorage.removeItem('cart');
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);
      if (courseExistingIdx >= 0) {
        state.cart.items.splice(courseExistingIdx, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    startPlayingVideo: (state, action: PayloadAction<{ lessonId: string; content: string }>) => {
      state.playingVideo = action.payload.content;
      state.lessonId = action.payload.lessonId;
    },
    setCurrentLessonDone: (state) => {
      state.isLessonDone = true;
    },
    calcTotalLectures: (state, action: PayloadAction<number>) => {
      state.totalLectures += action.payload;
    },
    calcTotalVideosLength: (state, action: PayloadAction<number>) => {
      state.totalVideosLength += action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    initLessonsDoneOfCourse: (state, action: PayloadAction<string[]>) => {
      state.lessonIdsDoneByCourseId = action.payload;
    },
    updateLessonDoneAtBrowser: (state, action: PayloadAction<string>) => {
      const existingLessonId = state.lessonIdsDoneByCourseId.findIndex((lessonId) => lessonId === action.payload);
      if (existingLessonId === -1) {
        state.lessonIdsDoneByCourseId.push(action.payload);
      }
    },
    initCurrentProgress: (state, action: PayloadAction<number>) => {
      state.currentProgress = action.payload;
    },
    createCertificatePath: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.certificatePath = action.payload;
      }
    },
    updateCurrentProgress: (state, action: PayloadAction<number>) => {
      state.currentProgress += action.payload;
    },
    updateIsLessonChange: (state, action: PayloadAction<string>) => {
      if (state.lessonId !== action.payload) {
        state.isLessonChange = true;
      } else {
        state.isLessonChange = false;
      }
    },
    resetLessonChange: (state) => {
      state.isLessonChange = false;
    },
    setPercentHavePlayed: (state, action: PayloadAction<number>) => {
      state.percentHavePlayed = action.payload;
    },
    setSelectedCoupon: (state, action: PayloadAction<string | null>) => {
      state.selectedCoupon = action.payload;
    },
    setCurrentLessonIndex: (state, action: PayloadAction<number>) => {
      state.currentLessonIndex = action.payload;
      
    },
    setLessonIds: (state, action: PayloadAction<string[]>) => {
      state.lessonIds = action.payload;
    }
  }
});

const clientReducer = clientSlice.reducer;
export const {
  addToCart,
  clearCart,
  removeCart,
  startPlayingVideo,
  calcTotalLectures,
  calcTotalVideosLength,
  setCurrentLessonDone,
  setSearchQuery,
  initLessonsDoneOfCourse,
  updateLessonDoneAtBrowser,
  initCurrentProgress,
  updateCurrentProgress,
  createCertificatePath,
  updateIsLessonChange,
  resetLessonChange,
  setPercentHavePlayed,
  setSelectedCoupon,
  setCurrentLessonIndex,
  setLessonIds
  // refetchCourseEnrolledbyUser
} = clientSlice.actions;
export default clientReducer;
