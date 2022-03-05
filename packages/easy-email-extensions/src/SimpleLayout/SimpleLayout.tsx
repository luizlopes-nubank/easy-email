import { ShortcutToolbar } from '../ShortcutToolbar';
import { Button, Card, ConfigProvider, Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React, { useState } from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { BlockLayer, BlockLayerProps } from '../BlockLayer';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';
import enUS from '@arco-design/web-react/es/locale/en-US';
import MergeTagBadge from '@extensions/MergeTagBadge';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';

export const SimpleLayout: React.FC<
  {
    showSourceCode?: boolean;
    defaultShowLayer?: boolean;
  } & BlockLayerProps
> = (props) => {
  const { height: containerHeight } = useEditorProps();
  const { showSourceCode = true, defaultShowLayer = true } = props;
  const [collapsed, setCollapsed] = useState(!defaultShowLayer);
  return (
    <ConfigProvider locale={enUS}>
      <Layout
        className={styles.SimpleLayout}
        style={{
          display: 'flex',
          width: '100vw',
          overflow: 'hidden',
          minWidth: 1400,
        }}
      >
        <Layout.Sider
          style={{ paddingRight: 0 }}
          collapsed={collapsed}
          collapsible
          trigger={null} breakpoint='xl'
          collapsedWidth={60}
          width={'300'}
        >
          <Card bodyStyle={{ padding: 0 }} style={{ border: 'none' }}>
            <Card.Grid style={{ width: 60, textAlign: 'center' }}>
              <ShortcutToolbar />
              <Button style={{
                marginTop: 30,
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
                icon={collapsed ? <IconRight /> : <IconLeft />}
                shape='round'
                onClick={() => setCollapsed(v => !v)}
              />
            </Card.Grid>
            <Card.Grid
              className={styles.customScrollBar}
              style={{
                flex: 1,
                paddingBottom: 50,
                border: 'none',
                height: containerHeight,
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Card title='Layout' style={{ border: 'none' }}>
                {!collapsed && (
                  <BlockLayer renderTitle={props.renderTitle} />
                )}
              </Card>
            </Card.Grid>

          </Card>
        </Layout.Sider>

        <Layout style={{ height: containerHeight }}>{props.children}</Layout>

        <Layout.Sider
          style={{
            height: containerHeight,
            minWidth: 300,
            maxWidth: 350,
            width: 350,
          }}
          className={styles.rightSide}
        >
          <Card
            size='small'
            id='rightSide'
            style={{
              maxHeight: '100%',
              height: '100%',
              borderLeft: 'none',
            }}
            bodyStyle={{ padding: 0 }}
            className={styles.customScrollBar}
          >
            <Tabs>
              <Tabs.TabPane title='Configuration'>
                <AttributePanel />
              </Tabs.TabPane>
              {showSourceCode && (
                <Tabs.TabPane destroyOnHide key='Source code' title='Source code'>
                  <SourceCodePanel />
                </Tabs.TabPane>
              )}
            </Tabs>
          </Card>
        </Layout.Sider>

        <InteractivePrompt />
        <MergeTagBadge />
      </Layout>
    </ConfigProvider>
  );
};
