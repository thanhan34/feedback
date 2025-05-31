import React from 'react';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ClientLayout from '../components/common/ClientLayout';
import PersonalizedReviewExample from '../components/feedback/PersonalizedReviewExample';

export const metadata = {
  title: 'Personalized Review Example | PTE Intensive',
  description: 'Example of personalized review generation for 5-star ratings',
};

export default function PersonalizedReviewExamplePage() {
  return (
    <>
      <Header />
      <main className="flex-grow py-8">
        <Container>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Ví dụ về Review được cá nhân hóa
            </h1>
            <p className="text-gray-600">
              Trang này minh họa cách hiển thị review được cá nhân hóa khi học viên đánh giá 5 sao.
              Thử thay đổi thông tin và điểm đánh giá để xem kết quả.
            </p>
          </div>
          
          <ClientLayout>
            <PersonalizedReviewExample />
          </ClientLayout>
        </Container>
      </main>
      <Footer />
    </>
  );
}
