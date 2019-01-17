import * as React from 'react';
import * as Scrivito from 'scrivito';
function Sidebar() {
  const root = Scrivito.Obj.root();
  if (!root) { return null; }
  return (
    <Scrivito.ContentTag content={ root } attribute="sidebar" />
  );
}

export default Scrivito.connect(Sidebar);