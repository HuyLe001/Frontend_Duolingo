import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Shop.css';

function Shop() {
  const [items, setItems] = useState([]);
  const [userGems, setUserGems] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    loadShopData();
  }, []);

  const loadShopData = async () => {
    try {
      setLoading(true);
      
      // Load user gems
      const progress = await api.getUserProgress(userId);
      setUserGems(progress.gems);

      // Mock shop items (backend có model nhưng chưa có API)
      const mockItems = [
        {
          itemId: 1,
          itemName: 'Streak Freeze',
          description: 'Bảo vệ streak của bạn trong 1 ngày',
          price: 10,
          icon: '❄️'
        },
        {
          itemId: 2,
          itemName: 'XP Boost',
          description: 'Tăng gấp đôi XP trong 30 phút',
          price: 20,
          icon: '⚡'
        },
        {
          itemId: 3,
          itemName: 'Heart Refill',
          description: 'Khôi phục toàn bộ trái tim',
          price: 15,
          icon: '❤️'
        },
        {
          itemId: 4,
          itemName: 'Super Duo',
          description: 'Không giới hạn hearts trong 1 tuần',
          price: 50,
          icon: '🦉'
        },
        {
          itemId: 5,
          itemName: 'Legendary Chest',
          description: 'Rương huyền thoại với phần thưởng ngẫu nhiên',
          price: 100,
          icon: '🎁'
        },
        {
          itemId: 6,
          itemName: 'Time Warp',
          description: 'Hoàn thành ngay 1 bài học',
          price: 30,
          icon: '⏰'
        }
      ];
      
      setItems(mockItems);
    } catch (err) {
      console.error('Load shop error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyItem = async (item) => {
    if (userGems < item.price) {
      alert(`Không đủ gems! Bạn cần ${item.price - userGems} gems nữa.`);
      return;
    }

    // Mock purchase (chưa có API)
    const confirm = window.confirm(
      `Mua ${item.itemName} với ${item.price} 💎?\n\nGems còn lại: ${userGems - item.price}`
    );

    if (confirm) {
      setUserGems(userGems - item.price);
      alert(`✅ Đã mua ${item.itemName}!\n\n${item.description}`);
      // TODO: Call API khi backend có ShopController
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>🏪 Cửa Hàng</h1>
        <div className="user-gems">
          <span className="gems-icon">💎</span>
          <span className="gems-amount">{userGems}</span>
        </div>
      </div>

      <div className="shop-grid">
        {items.map((item) => {
          const canAfford = userGems >= item.price;
          
          return (
            <div 
              key={item.itemId} 
              className={`shop-item ${!canAfford ? 'disabled' : ''}`}
            >
              <div className="item-icon">{item.icon}</div>
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <div className="item-footer">
                <div className="item-price">
                  <span className="price-icon">💎</span>
                  <span className="price-amount">{item.price}</span>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyItem(item)}
                  disabled={!canAfford}
                >
                  {canAfford ? 'Mua' : 'Không đủ'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop-info">
        <h3>💡 Cách kiếm Gems</h3>
        <ul>
          <li>Hoàn thành bài học: +5 💎</li>
          <li>Đạt 3 sao: +2 💎 bonus</li>
          <li>Đạt 2 sao: +1 💎 bonus</li>
          <li>Hoàn thành nhiệm vụ hàng ngày: +5 💎</li>
          <li>Giữ streak liên tục: Bonus gems theo ngày</li>
        </ul>
      </div>
    </div>
  );
}

export default Shop;
