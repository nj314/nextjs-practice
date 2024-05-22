import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shared/components/ui';
import { AdminQuizManager } from './components/QuizManager';

export function AdminPage() {
  return (
    <Tabs defaultValue="repRater" className="w-full px-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="repRater">Rep Rater</TabsTrigger>
        <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
      </TabsList>
      <TabsContent value="repRater">
        <Card>
          <CardHeader>
            <CardTitle>Rep Rater</CardTitle>
            <CardDescription>Manage quiz site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AdminQuizManager />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="whiteboard">
        <Card>
          <CardHeader>
            <CardTitle>Whiteboard</CardTitle>
            <CardDescription>TODO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">Form here</CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
