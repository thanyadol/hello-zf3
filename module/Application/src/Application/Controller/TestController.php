<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Application\Models\Users;
use Zend\Json\Json;
use Zend\View\Model\JsonModel;

use Zend\Cache\StorageFactory;
use Zend\Cache\Storage\Adapter\Memcached;
use Zend\Cache\Storage\StorageInterface;
use Zend\Cache\Storage\AvailableSpaceCapableInterface;
use Zend\Cache\Storage\FlushableInterface;
use Zend\Cache\Storage\TotalSpaceCapableInterface;
/*
$this->params()->fromPost('paramname');   // From POST
$this->params()->fromQuery('paramname');  // From GET
$this->params()->fromRoute('paramname');  // From RouteMatch
$this->params()->fromHeader('paramname'); // From header
$this->params()->fromFiles('paramname');
*/
class TestController extends AbstractActionController
{

    public function __construct()
    {
        $this->cacheTime = 7;
        $this->now = date("Y-m-d H:i:s");
        $this->config = include __DIR__ . '../../../../config/module.config.php';
        $this->adapter = new Adapter($this->config['Db']);

        //storage
        $this->cache = StorageFactory::factory(array(
            'adapter' => array(
                'name'    => 'filesystem',
                'options' => array('ttl' => $this->cacheTime),
                ),
         ));
        

    }

    public function basic()
    {
        $view = new ViewModel();
        //Route
        $view->lang = $this->params()->fromRoute('lang', 'th');
        $view->action = $this->params()->fromRoute('action', 'index');
        $view->id = $this->params()->fromRoute('id', '');
        $view->page = $this->params()->fromQuery('page', 1);

        $view->ttl = $this->cacheTime;

        return $view;       
    } 
    

    public function indexAction() 
    {
        try
        {
            $view = $this->basic();
  
        }
        catch( Exception $e )
        {
            print_r($e);
        }

       /* $this->cache->setItem('a', 'b');
        for ($i = 1; $i <= 7; $i++) {
            sleep(1);
            echo "var_dump on {$i}th second ... ";
            var_dump( $this->cache->getItem('a'));
        }*/
        
        //hasItem() or getItem()

        //1st proble >> foo
        $x = 5;
        $key = "foo" . $x;

       // var_dump($key);  

        if ( $this->cache->hasItem($key)) {

            $re = $this->cache->getItem($key);

            //get
            $view->foo =  $re . "  { from cached } ";
            $view->fooColor = "red";
        } 
        else {          

            $re = $this->foo($x);
          
            //set cahce
            $this->cache->setItem($key, $re);   

            //view
            $view->foo = $re . "  { from calculated } ";
            $view->fooColor = "green";
        }


        //2nd problem >> bar
        $key = "bar";
    
        if ( $this->cache->hasItem($key)) {

            $re = $this->cache->getItem($key);

            //get
            $view->bar =  $re . "  { from cached } ";
            $view->barColor = "red";
        } 
        else {          

            $re = $this->bar();
          
            //set cahce
            $this->cache->setItem($key, $re);   

            //view
            $view->bar = $re . "  { from calculated } ";
            $view->barColor = "green";
        }
        

        return $view;
        
    }

    private function foo ($x)
    {
        //3 = 3 + (1*0)
       // 5 = 3 + (2*1)
        //9 = 3 + (3*2)
       //15 = 3 + (4*3) 
       //...
       // f(x) = 3 + (x * (x-1)) 

        return 3 +  ($x * ($x - 1));

    }

    
    private function bar ()
    {
        //(X + (2^4)) + (10 * 2) = 99 
        // x = 99 - (10 * 2) -  (2^4)

        return  (99 - (10 * 2)) -  (2**4);

    }

}