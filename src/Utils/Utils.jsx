import {
  Article,
  Campaign,
  Comment,
  ConfirmationNumber,
  CreateNewFolder,
  Folder,
  FolderCopy,
  Group,
  Home,
  List,
  Message,
  Percent,
  PermIdentity,
  ShoppingBag,
} from "@mui/icons-material";
const BaseURL = 'http://localhost:5000/v1/';

const AdminDashboardNavItems = [
  {
    id: 1,
    to: "overview",
    icon: <Home />,
    text: "نمای کلی",
  },
  {
    id: 2,
    to: "users",
    icon: <Group />,
    text: " کاربرها",
  },
  {
    id: 3,
    to: "courses",
    icon: <Folder />,
    text: " دوره‌ها",
  },
  {
    id: 4,
    to: "sessions",
    icon: <CreateNewFolder />,
    text: " جلسه دوره‌ها ",
  },
  {
    id: 5,
    to: "category",
    icon: <FolderCopy />,
    text: " دسته بندی‌ها",
  },
  {
    id: 6,
    to: "comments",
    icon: <Comment />,
    text: " نظر‌ها",
  },
  {
    id: 7,
    to: "menus",
    icon: <List />,
    text: " منوها",
  },
  {
    id: 8,
    to: "blogs",
    icon: <Article />,
    text: " مقاله‌ها",
  },
  {
    id: 9,
    to: "messages",
    icon: <Message />,
    text: " پیام‌ها",
  },
  {
    id: 10,
    to: "tickets",
    icon: <ConfirmationNumber />,
    text: " تیکت ها ",
  },
  {
    id: 11,
    to: "discount",
    icon: <Percent />,
    text: " کدهای تخفیف",
  },
  {
    id: 12,
    to: "campaign",
    icon: <Campaign />,
    text: "  ایجاد کمپین",
  },
];

const AdminProfileNavItems = [
  {
    id: 1,
    to: 'orders',
    icon: <ShoppingBag />,
    text: '  سفارش‌ها '
  },
  {
    id: 2,
    to: 'courses',
    icon: <FolderCopy />,
    text: '  دوره‌های من '
  },
  {
    id: 3,
    to: 'tickets',
    icon: <ConfirmationNumber />,
    text: ' تیکت ها '
  },
  {
    id: 4,
    to: 'editProfile',
    icon: <PermIdentity />,
    text: '  جزییات حساب '
  },
]

function ChangeGregorianDateToPersian(date) {
    let gy, gm, gd
    gy = +date.slice(0,4)
    gm = +date.slice(5,7)
    gd = +date.slice(8,10)
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return [jy + '/' + jm + '/' + jd];
  }

  export {ChangeGregorianDateToPersian, BaseURL , AdminDashboardNavItems , AdminProfileNavItems}