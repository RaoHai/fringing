import '../definitions/reactART';
import * as React from 'react';
import { Group, Text, Shape } from 'react-art';
import Link from '../components/Link';

export default function renderLinks(links) {
  return links.map((linkArray, idx) =>
    <Group key={`link-${idx}`}>
      {linkArray.map( (link, keyIdx) => <Link key={`link-${keyIdx}`} data={link} />)}
    </Group>
  );
}
