import Sem1Component from './Sem1Component';
import Sem2Component from './Sem2Component';
import Sem3Component from './Sem3Component';
import Sem4Component from './Sem4Component';
import Sem5Component from './Sem5Component';
import Sem6Component from './Sem6Component';

const MainResultPage = ({ semester,id,role,session }) => {

  console.log("-----------------------",role);

  const renderSemesterComponent = () => {
    switch (semester) {
      case 'sem1':
        return <Sem1Component uucmsId={id} role={role} session={session}/>;
      case 'sem2':
        return <Sem2Component uucmsId={id} role={role} session={session}/>;
      case 'sem3':
        return <Sem3Component uucmsId={id} role={role} session={session}/>;
      case 'sem4':
        return <Sem4Component uucmsId={id} role={role} session={session}/>;
      case 'sem5':
        return <Sem5Component uucmsId={id} role={role} session={session}/>;
      case 'sem6':
        return <Sem6Component uucmsId={id} role={role} session={session}/>;
      default:
        return <div>Please select a valid semester.</div>;
    }
  };

  return <div>{renderSemesterComponent()}</div>;
};

export default MainResultPage;
