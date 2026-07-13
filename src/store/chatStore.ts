import { create } from "zustand";

// 1. Kiểu dữ liệu của một Tin nhắn (Message)
export interface Message {
  id: string;              // ID duy nhất của tin nhắn
  role: "user" | "assistant"; // Vai trò người gửi: "user" hoặc "assistant" (AI)
  content: string;         // Nội dung văn bản
  timestamp: number;       // Thời gian gửi
  isSearching?: boolean;   // AI có đang giả lập tìm kiếm web không
  searchQueries?: string[]; // Mảng các câu lệnh tìm kiếm web của AI
  searchResults?: Array<{ title: string; url: string; snippet: string }>; // Kết quả tìm web giả lập
}

// 2. Kiểu dữ liệu của một cuộc trò chuyện (Chat)
export interface Chat {
  id: string;              // ID cuộc hội thoại
  title: string;           // Tên cuộc hội thoại hiển thị ở thanh bên trái
  messages: Message[];     // Danh sách các tin nhắn trong cuộc hội thoại này
  model: string;           // Tên mô hình AI được chọn (ví dụ: ChatGPT, GPT-4o)
  createdAt: number;       // Thời gian tạo
  webSearchEnabled: boolean; // Trạng thái bật/tắt Web Search
}

// 3. Kiểu dữ liệu tổng quát cho Bộ quản lý dữ liệu (ChatState)
interface ChatState {
  chats: Chat[];                // Mảng lưu danh sách các cuộc hội thoại
  currentChatId: string | null; // ID cuộc hội thoại đang mở
  currentView: "chat" | "library" | "projects"; // Trang hiển thị hiện tại: chat, thư viện, dự án
  isSidebarOpen: boolean;       // Trạng thái đóng/mở thanh bên trái
  searchQuery: string;          // Từ khóa tìm kiếm các cuộc hội thoại
  selectedModel: string;        // Tên mô hình AI đang chọn toàn cục
  webSearchGlobal: boolean;     // Trạng thái bật/tắt Web Search toàn cục
  isGenerating: boolean;        // AI có đang sinh câu trả lời không
  isSearchModalOpen: boolean;   // Trạng thái mở/đóng modal tìm kiếm chat
  isProfileMenuOpen: boolean;   // Trạng thái mở/đóng menu thông tin cá nhân ở footer
  
  // Các hàm hành động (Actions) tác động lên dữ liệu
  createNewChat: () => string;
  setCurrentChatId: (id: string | null) => void;
  setCurrentView: (view: "chat" | "library" | "projects") => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, title: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedModel: (model: string) => void;
  setWebSearchGlobal: (enabled: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setProfileMenuOpen: (open: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
}

// Dữ liệu hội thoại mẫu mặc định ban đầu để trang web không bị trống trải
const INITIAL_CHATS: Chat[] = [
  {
    id: "chat-1",
    title: "Tóm tắt vụ gian lận",
    model: "ChatGPT",
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 giờ trước
    webSearchEnabled: true,
    messages: [
      {
        id: "m-1-1",
        role: "user",
        content: "Hãy tóm tắt vụ việc gian lận tài chính lớn gần đây.",
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
      },
      {
        id: "m-1-2",
        role: "assistant",
        content: `Dưới đây là tóm tắt vụ gian lận tài chính lớn nổi bật gần đây:

### Vụ án Vạn Thịnh Phát (Trương Mỹ Lan)
Đây được coi là một trong những vụ án lừa đảo tài chính lớn nhất lịch sử Đông Nam Á, với quy mô thiệt hại ước tính lên tới hơn **304.000 tỷ đồng** (khoảng 12.5 tỷ USD) liên quan đến Ngân hàng TMCP Sài Gòn (SCB).

*   **Phương thức hoạt động:** Trương Mỹ Lan đã thâu tóm và sở hữu chéo hơn 91.5% cổ phần SCB thông qua các cá nhân đại diện. Sau đó, bà sử dụng ngân hàng như một công cụ tài chính riêng để giải ngân cho các công ty trong hệ sinh thái Vạn Thịnh Phát.
*   **Thủ đoạn:** Tạo lập hàng nghìn hồ sơ vay vốn khống, sử dụng các công ty "ma", câu kết với các công ty thẩm định giá để nâng khống giá trị tài sản bảo đảm.
*   **Hậu quả:** Gây mất thanh khoản nghiêm trọng cho SCB, ảnh hưởng đến hàng nghìn người gửi tiền và nhà đầu tư trái phiếu.

Bạn có muốn tìm hiểu thêm về khía cạnh pháp lý hay quá trình khắc phục hậu quả của vụ án này không?`,
        timestamp: Date.now() - 1000 * 60 * 60 * 2 + 5000,
      }
    ]
  },
  {
    id: "chat-2",
    title: "Ghép mặt vào tờ tiền",
    model: "ChatGPT",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 ngày trước
    webSearchEnabled: false,
    messages: [
      {
        id: "m-2-1",
        role: "user",
        content: "Cách ghép mặt vào tờ tiền bằng Photoshop như thế nào?",
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
      },
      {
        id: "m-2-2",
        role: "assistant",
        content: `Để ghép mặt vào một tờ tiền bằng Photoshop trông thật nhất, bạn có thể thực hiện theo các bước chi tiết sau:

1.  **Chuẩn bị hình ảnh:**
    *   Tải về hình ảnh tờ tiền chất lượng cao (ví dụ: tờ 100 USD hoặc tờ tiền Polymer Việt Nam).
    *   Chuẩn bị ảnh chân dung của bạn với góc chụp và hướng ánh sáng tương tự như khuôn mặt trên tờ tiền.

2.  **Cắt khuôn mặt:**
    *   Mở cả hai ảnh trong Photoshop.
    *   Sử dụng công cụ **Pen Tool** hoặc **Lasso Tool** để khoanh vùng và cắt khuôn mặt của bạn ra khỏi nền.
    *   Kéo khuôn mặt vừa cắt sang file tờ tiền.

3.  **Căn chỉnh tỷ lệ và vị trí:**
    *   Sử dụng **Ctrl + T** (Free Transform) để xoay, thu nhỏ/phóng to khuôn mặt của bạn đè lên khuôn mặt gốc trên tờ tiền.
    *   Giảm Opacity của layer mặt xuống khoảng 50% để nhìn thấy khuôn mặt gốc bên dưới, giúp căn chỉnh mắt, mũi, miệng trùng khớp.

4.  **Chuyển đổi màu sắc (Matching Color):**
    *   Chuyển khuôn mặt của bạn thành ảnh đen trắng bằng cách vào \`Image -> Adjustments -> Black & White\`.
    *   Sử dụng công cụ \`Image -> Adjustments -> Match Color\` để đồng bộ tông màu xám của mặt với tông màu xám của tờ tiền gốc.

5.  **Tạo hiệu ứng vân tiền (Engraving Effect):**
    *   Để khuôn mặt có các đường vân sọc như tiền thật, hãy nhân bản layer mặt và áp dụng bộ lọc \`Filter -> Filter Gallery -> Halftone Pattern\`. Chọn Pattern Type là \`Lines\`, kích thước nhỏ khoảng 1-2.
    *   Đổi Blending Mode của layer hiệu ứng này sang **Overlay** hoặc **Soft Light** và điều chỉnh Opacity phù hợp.

Chúc bạn thực hiện thành công!`,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 + 10000,
      }
    ]
  }
];

// 4. Khởi tạo Zustand Store để quản lý và cập nhật dữ liệu
export const useChatStore = create<ChatState>((set, get) => ({
  chats: INITIAL_CHATS,         // Dữ liệu mẫu ban đầu
  currentChatId: "chat-1",      // Mở sẵn chat đầu tiên
  currentView: "chat",          // Trang hiển thị hiện tại: chat, library, projects
  isSidebarOpen: true,          // Mở sidebar bên trái
  searchQuery: "",              // Từ khóa tìm kiếm rỗng
  selectedModel: "ChatGPT",     // Model mặc định là ChatGPT
  webSearchGlobal: false,       // Tắt tìm kiếm web toàn cục mặc định
  isGenerating: false,          // AI chưa hoạt động sinh chữ
  isSearchModalOpen: false,     // Mặc định đóng modal tìm kiếm chat
  isProfileMenuOpen: false,     // Mặc định đóng menu cá nhân ở footer

  // Hàm tạo một cuộc trò chuyện mới hoàn toàn
  createNewChat: () => {
    const newId = `chat-${Date.now()}`; // Tạo ID độc bản dựa trên thời gian thực
    const newChat: Chat = {
      id: newId,
      title: "New chat",
      messages: [],
      model: get().selectedModel, // Lấy model đang được chọn hiện tại
      createdAt: Date.now(),
      webSearchEnabled: get().webSearchGlobal,
    };
    
    // Thêm chat mới vào đầu danh sách, đổi cuộc trò chuyện hiện tại thành ID mới này và chuyển view sang "chat"
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newId,
      currentView: "chat",
    }));

    return newId; // Trả về ID vừa tạo
  },

  // Hàm chuyển đổi cuộc trò chuyện hiển thị trên màn hình
  setCurrentChatId: (id) => {
    set({ currentChatId: id, currentView: "chat" });
  },

  // Hàm chuyển đổi trang hiển thị (chat, library, projects)
  setCurrentView: (view) => {
    set({ currentView: view });
  },

  // Hàm xóa cuộc trò chuyện
  deleteChat: (id) => {
    set((state) => {
      // Lọc bỏ cuộc trò chuyện có ID trùng khớp khỏi mảng
      const newChats = state.chats.filter((c) => c.id !== id);
      let newCurrentChatId = state.currentChatId;
      
      // Nếu xóa đúng cuộc trò chuyện đang xem, chuyển sang chat đầu tiên còn lại (hoặc null nếu hết sạch)
      if (state.currentChatId === id) {
        newCurrentChatId = newChats.length > 0 ? newChats[0].id : null;
      }
      
      return {
        chats: newChats,
        currentChatId: newCurrentChatId,
      };
    });
  },

  // Hàm đổi tên tiêu đề cuộc trò chuyện
  renameChat: (id, title) => {
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, title } : c)),
    }));
  },

  // Hàm thêm một tin nhắn mới vào cuộc trò chuyện bất kỳ
  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
      ),
    }));
  },

  // Hàm cập nhật nội dung/trạng thái của một tin nhắn cụ thể
  updateMessage: (chatId, messageId, updates) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, ...updates } : m
              ),
            }
          : c
      ),
    }));
  },

  // Hàm đóng/mở thanh bên trái
  setSidebarOpen: (open) => {
    set({ isSidebarOpen: open });
  },

  // Hàm thay đổi từ khóa tìm kiếm cuộc hội thoại
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Hàm đổi mô hình AI đang dùng
  setSelectedModel: (model) => {
    set({ selectedModel: model });
    // Nếu cuộc hội thoại hiện tại trống (chưa có tin nhắn nào), tự động đổi luôn model cho nó
    const currentId = get().currentChatId;
    if (currentId) {
      set((state) => ({
        chats: state.chats.map((c) =>
          c.id === currentId && c.messages.length === 0 ? { ...c, model } : c
        ),
      }));
    }
  },

  // Hàm bật/tắt Web Search
  setWebSearchGlobal: (enabled) => {
    set({ webSearchGlobal: enabled });
    const currentId = get().currentChatId;
    if (currentId) {
      set((state) => ({
        chats: state.chats.map((c) =>
          c.id === currentId ? { ...c, webSearchEnabled: enabled } : c
        ),
      }));
    }
  },

  // Setter cho modal tìm kiếm chat
  setSearchModalOpen: (open) => {
    set({ isSearchModalOpen: open });
  },

  // Setter cho profile menu ở footer
  setProfileMenuOpen: (open) => {
    set({ isProfileMenuOpen: open });
  },

  // Hàm gửi tin nhắn và sinh phản hồi tự động từ AI (giả lập gõ chữ typewriter)
  sendMessage: async (content) => {
    if (!content.trim() || get().isGenerating) return;

    let chatId = get().currentChatId;
    if (!chatId) {
      chatId = get().createNewChat(); // Tạo chat mới nếu chưa có
    }

    // 1. Thêm tin nhắn của User vào danh sách
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      timestamp: Date.now(),
    };
    get().addMessage(chatId, userMessage);
    
    // Tự động đổi tên tiêu đề chat dựa trên nội dung tin nhắn đầu tiên gửi đi
    const chat = get().chats.find((c) => c.id === chatId);
    if (chat && (chat.title === "New chat" || chat.messages.length === 0)) {
      const trimmedTitle = content.length > 25 ? content.substring(0, 25) + "..." : content;
      get().renameChat(chatId, trimmedTitle);
    }

    set({ isGenerating: true }); // Chuyển trạng thái: AI đang chuẩn bị viết chữ

    const assistantMsgId = `msg-${Date.now()}-assistant`;
    const isWebSearchEnabled = chat ? chat.webSearchEnabled : get().webSearchGlobal;

    // 2. Tạo tin nhắn trống của AI ban đầu
    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isSearching: isWebSearchEnabled,
      searchQueries: isWebSearchEnabled ? [`Đang tìm kiếm về: "${content}"`] : undefined,
    };
    get().addMessage(chatId, initialAssistantMessage);

    // 3. Giả lập quá trình suy nghĩ hoặc tìm kiếm Web của AI
    if (isWebSearchEnabled) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Đợi 2 giây tìm kiếm
      get().updateMessage(chatId, assistantMsgId, {
        isSearching: false, // Tắt hiển thị "Đang tìm kiếm..."
        searchResults: [    // Trả về liên kết giả lập
          {
            title: `Thông tin mới nhất về ${content}`,
            url: "https://google.com/search?q=" + encodeURIComponent(content),
            snippet: `Kết quả tìm kiếm tổng hợp cho thấy các thông tin chi tiết về chủ đề này...`
          }
        ]
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Đợi 0.8 giây suy nghĩ bình thường
    }

    // 4. Chọn mẫu câu trả lời phù hợp dựa trên nội dung hỏi
    let replyText = "";
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes("xin chào") || lowerContent.includes("hello") || lowerContent.includes("hi")) {
      replyText = `Xin chào! Tôi là **ChatGPT Clone**. Tôi có thể giúp gì cho bạn hôm nay? 

Bạn có thể hỏi tôi về lập trình, giải quyết vấn đề, viết lách, dịch thuật hoặc bật tính năng **Web Search** ở bên dưới thanh chat để tôi tìm kiếm thông tin trực tuyến mới nhất!`;
    } else if (lowerContent.includes("code") || lowerContent.includes("lập trình") || lowerContent.includes("python") || lowerContent.includes("javascript")) {
      replyText = `Dưới đây là một ví dụ về mã nguồn viết bằng **Python** để thực hiện thuật toán tìm kiếm nhị phân (Binary Search). Đây là một thuật toán tối ưu với độ phức tạp thời gian là $\\mathcal{O}(\\log n)$.

\`\`\`python
def binary_search(arr, target):
    """
    Thực hiện tìm kiếm nhị phân trên một mảng đã được sắp xếp.
    Trả về chỉ số của target nếu tìm thấy, ngược lại trả về -1.
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Kiểm tra xem target có ở giữa không
        if arr[mid] == target:
            return mid
        # Nếu target lớn hơn, bỏ qua nửa bên trái
        elif arr[mid] < target:
            left = mid + 1
        # Nếu target nhỏ hơn, bỏ qua nửa bên phải
        else:
            right = mid - 1
            
    return -1

# Kiểm thử hàm
my_list = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target_val = 11

result = binary_search(my_list, target_val)
if result != -1:
    print(f"Phần tử được tìm thấy tại chỉ số {result}")
else:
    print("Phần tử không tồn tại trong mảng")
\`\`\`

### Các điểm cần lưu ý:
1. Mảng đầu vào **bắt buộc** phải được sắp xếp từ trước.
2. Mỗi bước lặp sẽ chia đôi kích thước tìm kiếm, do đó tốc độ cực kỳ nhanh đối với các mảng dữ liệu lớn.`;
    } else {
      const searchStatusStr = isWebSearchEnabled ? " (đã sử dụng kết quả tìm kiếm web mới nhất)" : "";
      replyText = `Tôi đã nhận được yêu cầu của bạn về: "${content}"${searchStatusStr}.

Dưới đây là một số thông tin chi tiết liên quan:

1.  **Tổng quan:** Vấn đề này có thể được tiếp cận từ nhiều góc độ khác nhau tùy thuộc vào ngữ cảnh sử dụng cụ thể của bạn.
2.  **Chi tiết triển khai:**
    *   **Bước 1:** Xác định rõ mục tiêu và các biến số đầu vào.
    *   **Bước 2:** Xây dựng kế hoạch thực hiện từng bước (từng giai đoạn).
    *   **Bước 3:** Kiểm tra, đánh giá hiệu quả và tinh chỉnh lại.

Nếu bạn có câu hỏi cụ thể nào hơn, hãy cứ cho tôi biết nhé!`;
    }

    // 5. Hiệu ứng gõ chữ của AI (Typewriter Effect)
    let currentText = "";
    const words = replyText.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      get().updateMessage(chatId, assistantMsgId, { content: currentText });
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 20 + 15)); // Khoảng nghỉ ngẫu nhiên tạo độ mượt
    }

    set({ isGenerating: false }); // Hoàn tất quá trình phản hồi
  },
}));
