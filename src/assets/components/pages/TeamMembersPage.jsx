import MainNavigationBar from "../layout/MainNavigationBar";
import SiteFooter from "../layout/SiteFooter";
import "../../styles/TeamMembersPage.css";

export default function TeamMembersPage({
  currentUser,
  getTotalItems,
  setSelectedCategory, // دالة لتغيير التصنيف المختار من الفوتر.
}) {
  // واجهة العرض (JSX)
  return (
    //نرجع هيكل الصفحة داخل <div> رئيسية بكلاس page-container عشان نطبّق عليها التنسيقات العامة.
    <div className="page-container">
      {/*نعرض شريط التنقل العلوي.
      نرسل له بيانات المستخدم وعدد المنتجات في السلة.*/}
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      {/*قسم اعضاء الفريق*/}
      {/*نبدأ قسم المحتوى الخاص بأعضاء الفريق.*/}
      <div className="members-content">
        <h1>Our Team</h1>
        <p className="team-description">
          Meet our dedicated team of professionals who work tirelessly to bring
          you the best shopping experience. Our team combines expertise,
          creativity, and passion to deliver exceptional service and carefully
          curated products.
        </p>
        {/*→ شبكة تعرض البطاقات (Cards) الخاصة بأعضاء الفريق بشكل منظم.*/}
        <div className="team-grid">
          {/*كل بطاقة تمثل عضو في الفريق. نعرض الاسم، الدور، وصورة رمزية (أو الأحرف الأولى من الاسم).*/}
          <div className="team-card">
            {" "}
            {/*team-card → البطاقة التي تحتوي على بيانات العضو*/}
            <div className="team-avatar">AA</div>{" "}
            {/*دائرة بها الحروف الأولى من اسم العضو (AA، MH...).*/}
            <h3>Abdallah Ahmed</h3> {/*اسم العضو*/}
            <p className="team-role">Leader</p> {/*دور العضو في الفريق*/}
          </div>
          <div className="team-card">
            <div className="team-avatar">MH</div>
            <h3>Menna Hany</h3>
            <p className="team-role">Member</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">SH</div>
            <h3>Steven Hany</h3>
            <p className="team-role">Member</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">LA</div>
            <h3>Laila Ayman</h3>
            <p className="team-role">Member</p>
          </div>
        </div>
      </div>
      {/*نعرض الفوتر الخاص بالموقع.

نرسل له setSelectedCategory حتى يمكنه تغيير التصنيفات لو فيه روابط للتصنيفات في الفوتر.*/}
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
